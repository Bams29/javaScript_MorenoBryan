var replaceWords = function(dictionary, sentence) {
    const roots = new Set(dictionary);
    const words = sentence.split(' ');

    for (let i = 0; i < words.length; i++) {
        for (const root of roots) {
            if (words[i].startsWith(root)) {
                words[i] = root;
                break;
            }
        }
    }

    return words.join(' ');
};