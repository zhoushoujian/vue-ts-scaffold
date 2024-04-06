export const closureData = {
  backToLoginFunc: undefined as unknown as () => void,
};

export const updateBackToLoginFunc = (value: () => void) => {
  closureData.backToLoginFunc = value;
};
