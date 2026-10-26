/**
 * Contorno para pastas com "#" no caminho (ex.: "ebook culinaria1#").
 * O enhanced-resolve, usado pelo Tailwind para resolver `@import "tailwindcss"`,
 * devolve o "#" escapado como "\0#", e a leitura do arquivo falha.
 * O ajuste corrige o resultado na mesma instância que o Tailwind carrega de node_modules
 * (por isso o `require` é obtido em tempo de execução, fora da análise do bundler).
 * Sem "#" no caminho, nada muda. Se a pasta for renomeada sem "#", este bloco pode sair.
 */
if (process.cwd().includes("#")) {
  const { createRequire } = process.getBuiltinModule("node:module");
  const { join } = process.getBuiltinModule("node:path");
  const runtimeRequire = createRequire(join(process.cwd(), "package.json"));
  const tailwindNode = runtimeRequire.resolve("@tailwindcss/node");
  const resolverPath = runtimeRequire.resolve("enhanced-resolve/lib/Resolver", { paths: [tailwindNode] });
  const Resolver = runtimeRequire(resolverPath);
  const original = Resolver.prototype.resolve;
  if (!original.__hashPathFix) {
    Resolver.prototype.resolve = function (context, path, request, resolveContext, callback) {
      return original.call(this, context, path, request, resolveContext, (err, result, ...rest) =>
        callback(err, typeof result === "string" ? result.replaceAll("\0#", "#") : result, ...rest),
      );
    };
    Resolver.prototype.resolve.__hashPathFix = true;
  }
}

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
