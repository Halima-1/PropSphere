import { useEffect, useState } from "react";
import ConnectButton from "../../connectionButton"
import "../../styles/layout.scss"
import { AppKitButton, useAppKitAccount } from "@reown/appkit/react";
import { Coins, HomeIcon, Moon, Sun } from "lucide-react";

const Header = () => {
    const { isconnected, address } = useAppKitAccount();
    const [theme, setTheme] = useState<'light' | 'dark'>(
        (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    );

    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-theme' : '';
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
    const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    return (
        <>
            <header>
                <div className="logo">
                    {/* <HomeIcon size={32} strokeWidth={2.5} /> */}
                    <b>PropShere</b>
                </div>
                <nav>
                    <ul>
                        <li id="">Home</li>
                        <li id="">Dashboard</li>
                        <li id="">Market place</li>
                    </ul>
                </nav>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button className="btn btn-outline" onClick={toggleTheme} style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {address ? (
                        // <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        //     <div className="wallet-badge" style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                        //         <Coins size={14} className="text-primary" />
                        //         <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{Number(info.balance).toLocaleString()} {info.symbol}</span>
                        //     </div>
                        <div className="wallet-badge" style={{ cursor: 'pointer' }} title="Click to disconnect">
                            <div className="indicator" />
                            <span>{shortenAddress(address)}</span>
                        </div>
                    ) :
                        <AppKitButton />
                    }
                </div>

            </header >        </>
    )
}

export default Header