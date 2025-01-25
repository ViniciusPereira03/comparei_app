export const colors = {
    white: "#FFF",
    mint_cream: "#EFFAF6",
    mint_green: "#DEF5EC",
    mint_green_2: "#BCEAD9",
    turquoise: "#78D5B3",
    hookers_green: "#3C6B5A",
    hookers_green_opacity: "#3c6b5ae6",
    dark_green: "#1E362D",
    black: "#000",
    xanthous: "#E6AF2E",
    tomato: "#FA694B",
    coquelicot: "#F9502D",
    scarlet: "#F8370F",
    bronze: "#CD7F32",
    silver: "#C0C0C0",
    gold: "#FFD700",
    font: {
        to_background: {
            white: "#000",
            mint_cream: "#000",
            mint_green: "#3C6B5A",
            mint_green_2: "#000",
            turquoise: "#FFF",
            hookers_green: "#FFF",
            hookers_green_opacity: "#FFF",
            dark_green: "#FFF",
            black: "#FFF",
            xanthous: "#000",
            tomato: "#000",
            coquelicot: "#FFF",
            scarlet: "#FFF",
            bronze: "#000",
            silver: "#000",
            gold: "#000",
        }
    }
}

export const getColorKeyByValue = (value) => {
    const entries = Object.entries(colors);
    for (const [key, colorValue] of entries) {
        if (colorValue === value) return key;
        if (typeof colorValue === 'object') {
            const subKey = getColorKeyByValue(colorValue);
            if (subKey) return subKey;
        }
    }
    return null;
  };