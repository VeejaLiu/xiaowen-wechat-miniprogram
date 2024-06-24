import { SOURCE_PATH } from "../constant/Urls";
// 点刺（dotwork）：这种风格的纹身通常是由特别多的点来设计和构成，通过点的密集程度来表现深浅和过度，基本上所有的题材都能用这种方式来表达。
// 纯黑/黑灰（blackwork）：和用黑灰来处理过度的风格不一样，这种风格只有一种颜色：纯粹的黑。通常是大面积的黑色或者纯黑色线条的图案。
// 小清新/简约（minimalist）：这种风格的纹身通常以简洁的线条和轮廓为主，类似于手绘的草图或速写。它强调线条的流畅和简洁，通常没有过多的细节或阴影。草图风格纹身给人一种原始、简约和艺术感的印象，常用于创意纹身设计中。
// 几何线条（geometric）：几何纹身就是利用线条和图形构成。极简主义却又充满个性，利用直线曲线和棱角的巧妙结合，可以带给人一种独特的优雅感觉。
// 传统美式（old school）：这种风格是“最像纹身的纹身”，是相对比较流行的一种风格。这种风格有很实在的轮廓线，很少的颜色变化和过度以及很少的细节。这种纹身都很简单，但是普遍会被认为：相对其他风格的纹身，这种纹身会更经久不衰。这种纹身通常也是由玫瑰、心、匕首、航海、鹰、头骨、钻石、妇女的头和船等内容构成。
// 新传统美式（new school）：相对于老传统，新传统颜色稍微多一点，颜色变化也稍微多一点，不过也具有老传统的“卡通”风格。这算是一种试验风格的纹身，既遵循了老传统的一些东西，又多了一些不同的改变。
// 日式（japanese）：日式纹身的历史可以追溯到公元前5000年，因此这种风格的特点是非常鲜明的。这种风格的细节特别多，有特别考究的一套图案绘制方式，每个日式纹身都是一个复杂的艺术品。日式纹身通常会覆盖全身、整个背部或者四肢。常见的内容有樱花、锦鲤、荷花、菊花、牡丹、龙、战犬和艺妓等。
// 动漫（anime）：动漫纹身是一种受到日本动漫文化启发的纹身艺术。它通常包括以动漫角色、动漫场景或动漫元素为主题的纹身设计。
// 写实（realism）：写实纹身是一种以真实主义风格表现图像的纹身艺术。它追求逼真的细节和精确的描绘，以再现现实世界中的人物、动物、植物或物体等。写实纹身通常使用细腻的线条和阴影来创造出立体感和深度，以使图像看起来栩栩如生。
// 超现实（surrealism）：风格名字就能很好地表达内容了：非现实的纹身。可能会使用带条纹的颜色、不寻常的形状来表现这个图形，使之具有很独特的艺术感。
// 图腾（tribal）：图腾纹身是一种受到原始部落文化和图腾信仰启发的纹身艺术。图腾在不同的文化中具有不同的含义和象征意义，通常代表着特定的动物、自然元素或神灵等。

// 简写：
// 点刺（dotwork）
// 纯黑/黑灰（blackwork）
// 小清新/简约（minimalist）
// 几何线条（geometric）
// 传统美式（old school）
// 新传统美式（new school）
// 日式（japanese）
// 动漫（anime）
// 写实（realism）
// 超现实（surrealism）
// 图腾（tribal）
export const TATTOO_STYLES = [
    {
        index: 1,
        name: '点刺',
        icon: SOURCE_PATH + "/images/styles/dotwork-cat.png",
        description:
            '这种风格的纹身通常是由特别多的点来设计和构成，通过点的密集程度来表现深浅和过度，基本上所有的题材都能用这种方式来表达。',
    },
    {
        index: 2,
        name: '纯黑',
        icon: SOURCE_PATH + "/images/styles/blackgrey-cat.png",
        description: '这种风格只有一种颜色：纯粹的黑。通常是大面积的黑色或者纯黑色线条的图案。',
    },
    {
        index: 3,
        name: '小清新',
        icon: SOURCE_PATH + "/images/styles/minimalist-cat.png",
        description:
            '这种风格的纹身通常以简洁的线条和轮廓为主，类似于手绘的草图或速写。它强调线条的流畅和简洁，通常没有过多的细节或阴影。',
    },
    {
        index: 4,
        name: '几何',
        icon: SOURCE_PATH + "/images/styles/geo-cat.png",
        description:
            '几何纹身就是利用线条和图形构成。极简主义却又充满个性，利用直线曲线和棱角的巧妙结合，可以带给人一种独特的优雅感觉。',
    },
    {
        index: 5,
        name: 'Old School',
        icon: SOURCE_PATH + "/images/styles/oldschool-cat.png",
        description:
            '这种风格是“最像纹身的纹身”，是相对比较流行的一种风格。这种风格有很实在的轮廓线，很少的颜色变化和过度以及很少的细节。这种纹身都很简单，但是普遍会被认为：相对其他风格的纹身，这种纹身会更经久不衰。',
    },
    {
        index: 6,
        name: 'New School',
        icon: SOURCE_PATH + "/images/styles/newschool-cat.png",
        description:
            '相对于老传统，新传统颜色稍微多一点，颜色变化也稍微多一点，不过也具有老传统的“卡通”风格。这算是一种试验风格的纹身，既遵循了老传统的一些东西，又多了一些不同的改变。',
    },
    {
        index: 7,
        name: '日式',
        icon: SOURCE_PATH + "/images/styles/japanese-cat.png",
        description:
            '日式纹身的历史可以追溯到公元前5000年，因此这种风格的特点是非常鲜明的。这种风格的细节特别多，有特别考究的一套图案绘制方式，每个日式纹身都是一个复杂的艺术品。日式纹身通常会覆盖全身、整个背部或者四肢。',
    },
    {
        index: 8,
        name: '写实',
        icon: SOURCE_PATH + "/images/styles/realism-cat.png",
        description:
            '写实纹身是一种以真实主义风格表现图像的纹身艺术。它追求逼真的细节和精确的描绘，以再现现实世界中的人物、动物、植物或物体等。',
    },
    {
        index: 9,
        name: '垃圾波尔卡',
        icon: SOURCE_PATH + "/images/styles/tp-cat.png",
        description: '',
    },
    {
        index: 10,
        name: '图腾',
        icon: SOURCE_PATH + "/images/styles/tribal-cat.png",
        description:
            '图腾纹身是一种受到原始部落文化和图腾信仰启发的纹身艺术。图腾在不同的文化中具有不同的含义和象征意义，通常代表着特定的动物、自然元素或神灵等。',
    },
];
