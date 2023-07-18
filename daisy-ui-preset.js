module.exports = {
    themes: [
        {
            light: {
                ...require("daisyui/src/theming/themes")["[data-theme=light]"],
                accent: "#e2001a",
                'accent-content': "#fff"
            },
            dark: {
                ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
                accent: "#e2001a"
            }
        }
    ]
}
