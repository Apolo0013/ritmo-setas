var parar = false

document.querySelectorAll("div").forEach(e => {
    const data = e.dataset.e2e
    if (!data || data != "room-chat-like-btn") return
    setInterval(() => {
        if (!parar) {    
            if (typeof e.click == "function") {
                e.click()
                console.log('clicando gld.')
            }
        }
    }, 100)
})