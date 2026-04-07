import ShoppingCart from '@mui/icons-material/ShoppingCart';
import DirectionsCar from '@mui/icons-material/DirectionsCar';
import Movie from '@mui/icons-material/Movie';
import Favorite from '@mui/icons-material/Favorite';
import Home from '@mui/icons-material/Home';
import Checkroom from '@mui/icons-material/Checkroom';
import Category from '@mui/icons-material/Category';
import Restaurant from '@mui/icons-material/Restaurant';
import LocalCafe from '@mui/icons-material/LocalCafe';
import SportsEsports from '@mui/icons-material/SportsEsports';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import LocalHospital from '@mui/icons-material/LocalHospital';
import School from '@mui/icons-material/School';
import Work from '@mui/icons-material/Work';
import Flight from '@mui/icons-material/Flight';
import Train from '@mui/icons-material/Train';
import DirectionsBus from '@mui/icons-material/DirectionsBus';
import Phone from '@mui/icons-material/Phone';
import Laptop from '@mui/icons-material/Laptop';
import Savings from '@mui/icons-material/Savings';
import AccountBalance from '@mui/icons-material/AccountBalance';
import CreditCard from '@mui/icons-material/CreditCard';
import Pets from '@mui/icons-material/Pets';
import ChildCare from '@mui/icons-material/ChildCare';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import LocalMall from '@mui/icons-material/LocalMall';
import SportsSoccer from '@mui/icons-material/SportsSoccer';
import MusicNote from '@mui/icons-material/MusicNote';
import BeachAccess from '@mui/icons-material/BeachAccess';
import DirectionsBike from '@mui/icons-material/DirectionsBike';

export const ICON_MAP = {
  shopping_cart: ShoppingCart,
  directions_car: DirectionsCar,
  movie: Movie,
  favorite: Favorite,
  home: Home,
  checkroom: Checkroom,
  category: Category,

  restaurant: Restaurant,
  cafe: LocalCafe,
  games: SportsEsports,
  fitness: FitnessCenter,
  hospital: LocalHospital,
  education: School,
  work: Work,

  flight: Flight,
  train: Train,
  bus: DirectionsBus,
  phone: Phone,
  laptop: Laptop,

  savings: Savings,
  bank: AccountBalance,
  card: CreditCard,

  pets: Pets,
  kids: ChildCare,

  shopping_bag: ShoppingBag,
  mall: LocalMall,

  sport: SportsSoccer,
  music: MusicNote,
  travel: BeachAccess,
  bike: DirectionsBike,
};

export type IconName = keyof typeof ICON_MAP;