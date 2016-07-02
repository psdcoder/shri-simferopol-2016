const count = 100;
const images = [
    { image: 'images/medal.png', alt: 'Medal achievement' },
    { image: 'images/military-medal.png', alt: 'Military medal achievement' },
    { image: 'images/pedestal.png', alt: 'Pedestal achievement' },
    { image: 'images/prize.png', alt: 'Prize achievement' },
    { image: 'images/ribbon-badge.png', alt: 'Ribbon badge achievement' },
    { image: 'images/signs.png', alt: 'Signs achievement' },
    { image: 'images/thumb-up.png', alt: 'Thumb up achievement' },
    { image: 'images/trophy.png', alt: 'Trophy achievement' }
];
const imagesLength = images.length;
const styles = [null, 'green', 'purple', 'blue', 'orange', 'red', 'brown'];
const stylesLength = styles.length;

module.exports = () => {
    const achievements = [];

    for (let i = 0; i < count; i++) {
        const imageRandom = Math.floor(Math.random() * imagesLength);
        const styleRandom = Math.floor(Math.random() * stylesLength);

        achievements.push(Object.assign({}, images[imageRandom], { style: styles[styleRandom] }));
    }

    return achievements;
};
