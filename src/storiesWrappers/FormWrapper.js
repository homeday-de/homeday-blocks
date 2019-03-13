// "Hacky", but this way we can support knobs with other decorators, (Storybook's docs for Vue suck!)
export default (story) => {
  const storyComp = story();
  return {
    ...storyComp,
    template: `
      <div style="margin: 64px auto; max-width: 360px;">
        ${storyComp.template}
      </div>
    `,
  };
};
