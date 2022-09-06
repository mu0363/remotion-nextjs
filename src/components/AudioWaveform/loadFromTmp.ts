const pathRegExp = new RegExp("\\\\|/");

export const loadFile = async (filePath: string) => {
  const pathArray = filePath.split(pathRegExp);

  const fileName = pathArray[pathArray.length - 1];

  const returnFilePath = (await require(`../../tmp/${fileName}`)) as string;
  return returnFilePath;
};
