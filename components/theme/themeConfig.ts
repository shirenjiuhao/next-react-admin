import { theme } from "antd";

const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;
const AlgorithmMap: { [key: number]: any } = {
    1: defaultAlgorithm,
    2: darkAlgorithm,
    3: compactAlgorithm,
};
const defaultTheme = {
    algorithm: 1,
    colorPrimary: '#1677ff',
    fontSize: 14,
    borderRadius: 6,
    controlHeight: 32
}
export {
    AlgorithmMap,
    defaultTheme
}