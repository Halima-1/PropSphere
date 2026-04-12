import { ArrowRight, Coins, LinkIcon, ListCheck, ShoppingBag, WalletIcon } from "lucide-react"
import "../styles/landing.scss"
import { useReadAllProperties } from "../hooks/useGetAllProperties"
import PropertyCard from "../components/PropertyCard"
import { useNavigate } from "react-router-dom"
const Landing = () => {
    const properties = useReadAllProperties()
    const navigate = useNavigate()
    const featuredProperties = properties.filter((prop: any) => prop.isPropertyListed == true).slice(0, 3)


    return (
        <>
            <section className="hero">
                <div>
                    <span>{properties.length} Properties listed</span>
                    <span style={{ color: "#fbbf24" }}><Coins size={14} color="#fbbf24" margin-bottom="-10px" />0 Properties sold</span>
                    <span ><LinkIcon size={14} color="grey" />Lisk sepolia network</span>
                </div>
                <div className="text1">
                    <h1 className="hero-trans">Buy. Sell. Own.</h1>
                    <div className="hero-text"><h1 className="hero-cl" style={{ color: "#fbbf24" }}>Any Property.</h1><h1 className="hero-trans">Onchain.</h1></div>
                </div>
                <p>Propshere is a decentralized market place for listing and buying any property - Secured by blockchain.</p>
                <div className="hero-btn">
                    <button
                        onClick={() => {
                            navigate(`/market-place`)
                        }}
                    >Browse market place</button>
                    <button
                        onClick={() => {
                            navigate(`/Dashboard/create-property`)
                        }}
                    >List property</button>
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
                    <span
                        onClick={() => {
                            navigate(`/MarketPlace`)
                        }}
                    >View all listings <ArrowRight margin-top={20} /></span>
                </div>
                <div className="f-listings">
                    {featuredProperties.length === 0 ? (
                        <p style={{ color: "#94a3b8" }}>No listed properties yet.</p>

                    ) : (featuredProperties.map((prop: any) => (
                        <PropertyCard
                            key={prop.id}
                            {...prop}
                            onClick={() =>
                                navigate(`/market-place/${prop.id}`)

                            }
                        />

                    )))}
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