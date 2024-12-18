function App() {

    const [randomQuote, setRandomQuote] = React.useState("");
    const [randomColor, setRandomColor] = React.useState("#ffffff");


    async function getRandomQuote() {

        try {
            const response = await fetch('./quotes.json');
            const quotes = await response.json();
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            setRandomQuote(randomQuote);
            const colors = ["#ff5555", "#00aa00", "#5555ff"];
            const randomIndexColor = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndexColor];
            setRandomColor(randomColor);

        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
    }

    React.useEffect(() => {

        getRandomQuote();
    }, []);

    let twitterLink = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22"

    let quoteInLinkFormat = randomQuote.quote != null ? randomQuote.quote.replace(/ /g, "%20") : "";
    let authorInLinkFormat = randomQuote.author != null ? randomQuote.author.replace(/ /g, "%20") : "";

    let twitterLinkWithQuoteAndAuthor = twitterLink + quoteInLinkFormat + "%22%20-" + authorInLinkFormat;


    return (


        <div className="container mx-auto d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundColor: randomColor }}>
            <div id="quote-box" className="card " style={{ width: "18rem" }}>

                <div className="card-body">
                    <p id="text"><i className="bi bi-quote"></i> {randomQuote.quote}</p>
                    <small id="author">- {randomQuote.author}</small><br />
                    <div className="container d-flex justify-content-between mt-2">
                        <button id="new-quote" onClick={getRandomQuote} className="btn btn-primary" style={{ backgroundColor: randomColor, border: "none" }}>New Quote</button>
                        <a id="tweet-quote" href={twitterLinkWithQuoteAndAuthor} target="_blank" className="btn btn-primary mx-1" style={{ backgroundColor: randomColor, border: "none" }}><i className="bi bi-twitter-x"></i></a>
                    </div>

                </div>
            </div>
        </div>

    );
}

ReactDOM.createRoot(document.getElementById('quote-container')).render(<App />,);
