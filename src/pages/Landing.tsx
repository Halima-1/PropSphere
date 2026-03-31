import { ArrowRight, Coins, CoinsIcon, HomeIcon, House, HouseIcon, LinkIcon, List, ListCheck, ListChevronsDownUp, ListCollapse, ListEnd, ListOrderedIcon, LucideHouse, MapPinHouseIcon, ShoppingBag, Wallet2, WalletCardsIcon, WalletIcon } from "lucide-react"
import "../styles/landing.scss"
const Landing = () => {
    return (
        <>
            <section className="hero">
                <div>
                    <span>0 Properties listed</span>
                    <span style={{ color: "#fbbf24" }}><Coins size={14} color="#fbbf24" margin-bottom="-10px" />0 Properties sold</span>
                    <span ><LinkIcon size={14} color="grey" />Lisk sepolia network</span>
                </div>
                <div className="text1">
                    <h1 className="hero-trans">Buy. Sell. Own.</h1>
                    <div className="hero-text"><h1 className="hero-cl" style={{ color: "#fbbf24" }}>Any Property.</h1><h1 className="hero-trans">Onchain.</h1></div>
                </div>
                <p>Propshere is a decentralized market place for listing and buying any property - Secured by blockchain.</p>
                <div className="hero-btn">
                    <button>Browse market place</button>
                    <button>List property</button>
                </div>
            </section>

            {/* how it works */}
            <section className="how">
                <h3>How it works</h3>
                <div className="how-text">
                    <div>
                        <span>                                        <WalletIcon />
                        </span>

                        <b>01. Connect Wallet</b>
                        <p>Seamlessly link your web3 wallet. We support metamask, Coinbase and many other wallets on the Lisk sepolia network.</p>
                    </div>
                    <div>
                        <span><ListCheck />
                        </span>
                        <b>02. List or Browse</b>
                        <p>Upload your property details with verified metadata or browse our curated collection of verified on-chain estates</p>
                    </div>
                    <div>

                        <span>                                        <ShoppingBag />
                        </span>
                        <b>03. Buy On-Chain</b>
                        <p>Execute direct peer-to-peer transactions. Ownership is instantly transferred via smart contracts upon payment.</p>
                    </div>
                </div>
            </section>

            {/* featured listings */}
            <section className="featured">
                <h2>Featured listings</h2>
                <div className="f-intro">
                    <p>Recently listed properties available for purchase</p>
                    <span>View all listings <ArrowRight margin-top={20}/></span>
                </div>
                <div className="f-listings">
                    <div>
                        <b className="title">Featured</b>
                        <img src="https://media.istockphoto.com/id/155374658/photo/large-american-detached-home-with-garden-and-blue-sky.jpg?s=612x612&w=0&k=20&c=-jxhWacK1nuWcnbovLMMyKJA5zDMN_vzpGR41nnqIWQ=" alt="" />
                        <b className="f-price">123 ETH</b>
                        <div className="f-about">
                            <h3>Agege</h3>
                            <p>Recently listed properties available</p>
                            <div><span>333hhh</span><span>333hhh</span><span>333hhh</span></div>
                        </div>
                    </div>
                     <div>
                        <b className="title">Featured</b>
                        <img src="https://media.istockphoto.com/id/155374658/photo/large-american-detached-home-with-garden-and-blue-sky.jpg?s=612x612&w=0&k=20&c=-jxhWacK1nuWcnbovLMMyKJA5zDMN_vzpGR41nnqIWQ=" alt="" />
                        <b className="f-price">123 ETH</b>
                        <div className="f-about">
                            <h3>Agege</h3>
                            <p>Recently listed properties available</p>
                            <div><span>333hhh</span><span>333hhh</span><span>333hhh</span></div>
                        </div>
                    </div> <div>
                        <b className="title">Featured</b>
                        <img src="https://media.istockphoto.com/id/155374658/photo/large-american-detached-home-with-garden-and-blue-sky.jpg?s=612x612&w=0&k=20&c=-jxhWacK1nuWcnbovLMMyKJA5zDMN_vzpGR41nnqIWQ=" alt="" />
                        <b className="f-price">123 ETH</b>
                        <div className="f-about">
                            <h3>Agege</h3>
                            <p>Recently listed properties available</p>
                            <div><span>333hhh</span><span>333hhh</span><span>333hhh</span></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="overview">
                <div>
                    <h1>20+</h1>
                    <p>Total listed</p>
                </div>
                <div>
                    <h1>20+</h1>
                    <p>Property sold</p>
                </div><div>
                    <h1>23M+</h1>
                    <p>Volume (USD)</p>
                </div>
                <div>
                    <h1>20+</h1>
                    <p>Active sellers</p>
                </div>
            </section>
        </>
    )
}

export default Landing