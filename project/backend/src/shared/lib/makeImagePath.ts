export const makeImagePath = (el: Express.Multer.File) => {
    return `http://localhost:8000/${el?.filename}`;
};
