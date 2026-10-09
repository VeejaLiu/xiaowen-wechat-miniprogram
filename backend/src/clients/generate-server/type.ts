export enum TATTOO_STYLE {
    DOT_WORK = 1, // 点刺
    BLACK_WORK = 2, // 纯黑
    MINIMALIST = 3, // 小清新
    GEOMETRIC = 4, // 几何
    OLD_SCHOOL = 5, // Old School
    NEW_SCHOOL = 6, // New School
    JAPANESE = 7, // 日式
    REALISM = 8, // 现实
    TRASH_POLKA = 9, // 垃圾波尔卡
    TRIBAL = 10, // 部落
}

export interface GenerateConfig {
    prompt: string;
    negativePrompt: string;
    height: number;
    width: number;
}
