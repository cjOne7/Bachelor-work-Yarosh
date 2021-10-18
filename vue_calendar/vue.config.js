module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                @import "@/scss/style.scss";
                `
            }
        }
    }
}