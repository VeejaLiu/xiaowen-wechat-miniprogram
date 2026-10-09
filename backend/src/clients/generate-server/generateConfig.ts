import { GenerateConfig, TATTOO_STYLE } from './type';

// 通用负面提示词
const GENERAL_NEGATIVE_PROMPT = [
    'nsfw',
    // 'worst quality, low quality, normal quality, lowresolution, low resolution',
    // # "poor anatomical structure, poor hand, text, errors, missing fingers, multiple fingers, "
    // # "few fingers, cropped, worst quality, low quality, normal quality, jpeg artifacts, "
    'signature, watermark, username, blurry, exposed, nipple, penis, penis, vagina, anus',
    // # "underwear,Breast cleavage, sexy clothing,Not wearing clothes, boobs, Naked chest,"
    // # "nipple protrusion,expose the body,"
    // # "paper, painting, pen, pencil"
].join(', ');

// # 画质固定提示词
const quality_prompt = [
    // 'solo',
    // "hd, "
    // 'no background',
    'white background',
    // "beautiful pictures, ",
    // "masterpiece",
].join(', ');

// # 处理Prompt - Dot Work, 点刺
// def handle_prompt_dot_work(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"dotwork, "  # trigger word
//             + f"<lora:dotwork_for_dreamshaper8:1>, "
//             + f"{quality_prompt}"
//     )
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 512
//     width = 512
//     return {
//         "positive_prompt": positive_prompt,
//         "negative_prompt": negative_prompt,
//         "height": height,
//         "width": width
//     }
function getDotWorkConfig(description: string): GenerateConfig {
    // 正向提示词
    // const prompt = [
    //     description,
    //     'dotwork, monochrome, greyscale',
    //     '<lora:dotwork_for_dreamshaper8:0.6>',
    //     quality_prompt,
    // ].join(', ');

    // 正向提示词 V2
    const prompt = [description, '<lora:stippling-1-for-dreamshaper:0.6>', 'stippling', quality_prompt].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 512;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

// # 处理Prompt - Black Work, 纯黑
// def handle_prompt_black_work(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"blackgrey, monochrome, "  # trigger word
//             + f"<lora:blackgrey-for-dreamshaper8:0.7>, "
//             + f"{quality_prompt}"
//     )
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 512
//     width = 512
//     return {
//         "positive_prompt": positive_prompt,
//         "negative_prompt": negative_prompt,
//         "height": height,
//         "width": width
//     }
function getBlackWorkConfig(description: string): GenerateConfig {
    // 正向提示词
    const prompt = [description, 'blackgrey', '<lora:blackgrey-for_dreamshaper8:0.7>', quality_prompt].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 512;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

// # 处理Prompt - Minimalist, 小清新
// def handle_prompt_minimalist(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"minimalist, minimal, lineart, "
//             # trigger word
//             + f"<lora:minimalist-for-dreamshaper8:0.6>, "
//             + f"{quality_prompt}"
//     )
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 512
//     width = 512
//     return {
//         "positive_prompt": positive_prompt,
//         "negative_prompt": negative_prompt,
//         "height": height,
//         "width": width
//     }
function getMinimalistConfig(description: string): GenerateConfig {
    // 正向提示词
    const prompt = [
        description,
        '<lora:minimalist-for-dreamshaper8:0.6>',
        'mmmmmlist, monochrome, greyscale',
        quality_prompt,
    ].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 512;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

// # 处理Prompt - Geometric, 几何
// def handle_prompt_geometric(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"geometric, "  # trigger word
//             + f"<lora:geo-5-for-dreamshaper:0.6>, "
//             + f"{quality_prompt}"
//     )
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 640
//     width = 512
//     return {
//         "positive_prompt": positive_prompt,
//         "negative_prompt": negative_prompt,
//         "height": height,
//         "width": width
//     }
function getGeometricConfig(description: string): GenerateConfig {
    // 正向提示词
    const prompt = [description, '<lora:geo-5-for-dreamshaper:0.6>', 'geometric', quality_prompt].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 640;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

// # 处理Prompt - Old School, 传统美式
// def handle_prompt_old_school(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"oldschooltattoo, old school, "  # trigger word
//             + f"<lora:oldschool-for-dreamshaper8:0.8>, "
//             + f"{quality_prompt}"
//     )
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 640
//     width = 512
//     return {
//         "positive_prompt": positive_prompt,
//         "negative_prompt": negative_prompt,
//         "height": height,
//         "width": width
//     }
function getOldSchoolConfig(description: string): GenerateConfig {
    // 正向提示词
    const prompt = [
        description,
        'oldschooltattoo',
        'old school',
        '<lora:oldschool-for-dreamshaper8:0.8>',
        quality_prompt,
    ].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 640;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

// # 处理Prompt - New School, 新学派
// def handle_prompt_new_school(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"new school, "  # trigger word
//             + f"<lora:ns1-for-dreamshaper:0.8>, "
//             + f"{quality_prompt}"
//     )
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 512
//     width = 512
//     return {
//         "positive_prompt": positive_prompt,
//         "negative_prompt": negative_prompt,
//         "height": height,
//         "width": width
//     }
function getNewSchoolConfig(description: string): GenerateConfig {
    // 正向提示词
    const prompt = [description, 'new school', '<lora:ns1-for-dreamshaper:0.8>', quality_prompt].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 512;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

// # 处理Prompt - Japanese, 日式
// def handle_prompt_japanese(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"japanese, tattoo, japanese pattern, totem, "  # trigger word
//             + f"<lora:japanese-tattoo:0.5>, "
//             + f"{quality_prompt}"
//     )
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 640
//     width = 512
//     return {
//         "positive_prompt": positive_prompt,
//         "negative_prompt": negative_prompt,
//         "height": height,
//         "width": width
//     }
function getJapaneseConfig(description: string): GenerateConfig {
    // 正向提示词
    const prompt = [
        description,
        'japanese',
        'tattoo',
        'japanese pattern',
        'totem',
        '<lora:japanese-tattoo:0.5>',
        quality_prompt,
    ].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 640;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

// # 处理Prompt - Realism, 写实
// # TODO 暂时不需要LoRA模型，只用Prompt的效果就可以了
// def handle_prompt_realism(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"realistic, detailed, design, realism, monochrome, lineart, "
//             + f"{quality_prompt}"
//     )
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 512
//     width = 512
//     return {
//         "positive_prompt": positive_prompt,
//         "negative_prompt": negative_prompt,
//         "height": height,
//         "width": width
//     }
function getRealismConfig(description: string): GenerateConfig {
    // 正向提示词
    const prompt = [
        description,
        'realistic',
        'detailed',
        'design',
        'realism',
        'monochrome',
        'lineart',
        quality_prompt,
    ].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 512;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

// # 处理Prompt - Trash Polka, 垃圾波尔卡
// def handle_prompt_trash_polka(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"tp, blood, ink, "
//             + f"<lora:tp3-for-dreamshaper:0.7>, "
//             + f"{quality_prompt}"
//     )
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 512
//     width = 512
//     return {
//         "positive_prompt": positive_prompt,
//         "negative_prompt": negative_prompt,
//         "height": height,
//         "width": width
//     }
function getTrashPolkaConfig(description: string): GenerateConfig {
    // 正向提示词
    const prompt = [description, 'tp', 'blood', 'ink', '<lora:tp3-for-dreamshaper:0.7>', quality_prompt].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 512;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

// # 处理Prompt - Tribal, 图腾
// def handle_prompt_tribal(prompt):
//     # 正向提示词
//     positive_prompt = (
//             f"{prompt}, "
//             + f"tribal, "
//             + f"<lora:tribal-1-for-dreamshaper-000018:0.7>, "
//             + f"{quality_prompt}")
//
//     # 负向提示词
//     negative_prompt = general_negative_prompt
//     height = 512
//     width = 512
//
//     return {
//         'positive_prompt': positive_prompt,
//         'negative_prompt': negative_prompt,
//         'height': height,
//         'width': width
//     }
function getTribalConfig(description: string): GenerateConfig {
    // 正向提示词
    const prompt = [description, 'tribal', '<lora:tribal-1-for-dreamshaper-000018:0.7>', quality_prompt].join(', ');
    // 负向提示词
    const negative_prompt = GENERAL_NEGATIVE_PROMPT;
    const height = 512;
    const width = 512;
    return {
        prompt: prompt,
        negativePrompt: negative_prompt,
        height: height,
        width: width,
    };
}

export async function getGenerateConfig({
    style,
    prompt,
}: {
    style: TATTOO_STYLE;
    prompt: string;
}): Promise<GenerateConfig> {
    switch (style) {
        case TATTOO_STYLE.DOT_WORK:
            return getDotWorkConfig(prompt);
        case TATTOO_STYLE.BLACK_WORK:
            return getBlackWorkConfig(prompt);
        case TATTOO_STYLE.MINIMALIST:
            return getMinimalistConfig(prompt);
        case TATTOO_STYLE.GEOMETRIC:
            return getGeometricConfig(prompt);
        case TATTOO_STYLE.OLD_SCHOOL:
            return getOldSchoolConfig(prompt);
        case TATTOO_STYLE.NEW_SCHOOL:
            return getNewSchoolConfig(prompt);
        case TATTOO_STYLE.JAPANESE:
            return getJapaneseConfig(prompt);
        case TATTOO_STYLE.REALISM:
            return getRealismConfig(prompt);
        case TATTOO_STYLE.TRASH_POLKA:
            return getTrashPolkaConfig(prompt);
        case TATTOO_STYLE.TRIBAL:
            return getTribalConfig(prompt);
    }
}
