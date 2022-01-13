import WalletButton from '../WalletButton/WalletButton';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar border-gradient border-gradient-solana">
      <h1>Portfolio Appreciation App</h1>
      <WalletButton></WalletButton>
    </nav>
  );
};

export default Navbar;
