import { useEffect, useState } from "react";
import "../../styles/layout.scss"
import { AppKitButton, useAppKitAccount } from "@reown/appkit/react";
import { Coins, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
    // ✅ fixed typo — isConnected not isconnected
    const { isConnected, address } = useAppKitAccount();

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
        <header>
            <div className="logo">
                <b>PropShere</b>
            </div>
            <nav>
                <ul>
 <li>
            <NavLink
              className={"nav-item"}
              to={"/"}
              style={({ isActive }) =>
                isActive ? { color: "red" } : undefined
              }
            >
              Home
            </NavLink>
          </li>     
 <li>
            <NavLink
              className={"nav-item"}
              to={"/Dashboard/overview"}
              style={({ isActive }) =>
                isActive ? { color: "red" } : undefined
              }
            >
              Dashboard
            </NavLink>
          </li>
           <li>
            <NavLink
              className={"nav-item"}
              to={"/MarketPlace"}
              style={({ isActive }) =>
                isActive ? { color: "red" } : undefined
              }
            >
              Marketplace
            </NavLink>
          </li>
                </ul>
            </nav>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button

                    className="btn btn-outline"
                    onClick={toggleTheme}
                    style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}
                >

                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>

                {/* ✅ use isConnected to
 decide what to show */}
                {isConnected && address ? (
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div
                            className="wa
llet-badge"
                            style={{
                                background: 'rgba(251, 191, 36, 0.1)',
                                border: '1px solid rgba(251, 191, 36, 0.2)'
                            }}

                        >
                            <Coins size={14} className="text-primary" />
                        </div>
                        <div className="wallet-badge" style={{ cursor: 'pointer' }} title="Click to disconnect">
                            <div className="indicator" />
                            <span>{shortenAddress(address)}</span>
                        </div>
                    </div>
                ) : (
                    <AppKitButton />
                )}
            </div>
        </header>
    )
}

export default Header