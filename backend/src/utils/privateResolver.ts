const privateResolver = (resolverFunction: any) => async (root: any, args: any, ctx: any, info: any) => {
  if (!ctx.userId) {
    return { ok: false, data: null, error: "Login is required!" };
  }

  const resolved = await resolverFunction(root, args, ctx, info);
  return resolved;
};

export default privateResolver;
