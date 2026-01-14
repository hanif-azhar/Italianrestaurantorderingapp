import type { MenuItemType } from '../components/MenuItem';

export const menuData: MenuItemType[] = [
  // Antipasti (Appetizers)
  {
    id: 'antipasti-1',
    name: 'Bruschetta Classica',
    description: 'Toasted bread with fresh tomatoes, basil, garlic, and extra virgin olive oil',
    price: 8.50,
    category: 'Antipasti',
    vegetarian: true,
  },
  {
    id: 'antipasti-2',
    name: 'Prosciutto e Melone',
    description: 'Traditional Italian cured ham with fresh cantaloupe melon',
    price: 12.00,
    category: 'Antipasti',
  },
  {
    id: 'antipasti-3',
    name: 'Caprese',
    description: 'Fresh mozzarella, tomatoes, and basil with balsamic reduction',
    price: 10.50,
    category: 'Antipasti',
    vegetarian: true,
  },
  
  // Primi (Pasta)
  {
    id: 'primi-1',
    name: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with eggs, pecorino cheese, guanciale, and black pepper',
    price: 14.00,
    category: 'Primi',
  },
  {
    id: 'primi-2',
    name: 'Penne Arrabbiata',
    description: 'Penne pasta in a spicy tomato sauce with garlic and red chili',
    price: 12.00,
    category: 'Primi',
    vegetarian: true,
  },
  {
    id: 'primi-3',
    name: 'Lasagne alla Bolognese',
    description: 'Traditional layered pasta with rich meat ragù and béchamel sauce',
    price: 15.50,
    category: 'Primi',
  },
  {
    id: 'primi-4',
    name: 'Risotto ai Funghi',
    description: 'Creamy arborio rice with porcini mushrooms and parmesan',
    price: 16.00,
    category: 'Primi',
    vegetarian: true,
  },
  {
    id: 'primi-5',
    name: 'Fettuccine Alfredo',
    description: 'Fresh fettuccine in a creamy parmesan and butter sauce',
    price: 13.50,
    category: 'Primi',
    vegetarian: true,
  },

  // Pizza
  {
    id: 'pizza-1',
    name: 'Margherita',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 11.00,
    category: 'Pizza',
    vegetarian: true,
  },
  {
    id: 'pizza-2',
    name: 'Quattro Formaggi',
    description: 'Four cheese pizza with mozzarella, gorgonzola, parmesan, and fontina',
    price: 14.00,
    category: 'Pizza',
    vegetarian: true,
  },
  {
    id: 'pizza-3',
    name: 'Diavola',
    description: 'Spicy pizza with tomato, mozzarella, and spicy salami',
    price: 13.50,
    category: 'Pizza',
  },
  {
    id: 'pizza-4',
    name: 'Prosciutto e Funghi',
    description: 'Pizza with tomato, mozzarella, ham, and mushrooms',
    price: 14.50,
    category: 'Pizza',
  },

  // Secondi (Main Courses)
  {
    id: 'secondi-1',
    name: 'Osso Buco',
    description: 'Braised veal shanks in white wine and vegetables, served with risotto',
    price: 24.00,
    category: 'Secondi',
  },
  {
    id: 'secondi-2',
    name: 'Saltimbocca alla Romana',
    description: 'Veal escalopes with prosciutto and sage in white wine sauce',
    price: 22.00,
    category: 'Secondi',
  },
  {
    id: 'secondi-3',
    name: 'Pollo alla Parmigiana',
    description: 'Breaded chicken breast with tomato sauce and melted mozzarella',
    price: 18.00,
    category: 'Secondi',
  },

  // Dolci (Desserts)
  {
    id: 'dolci-1',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
    price: 7.50,
    category: 'Dolci',
    vegetarian: true,
  },
  {
    id: 'dolci-2',
    name: 'Panna Cotta',
    description: 'Silky vanilla cream dessert with berry compote',
    price: 6.50,
    category: 'Dolci',
    vegetarian: true,
  },
  {
    id: 'dolci-3',
    name: 'Cannoli Siciliani',
    description: 'Crispy pastry shells filled with sweet ricotta and chocolate chips',
    price: 7.00,
    category: 'Dolci',
    vegetarian: true,
  },

  // Bevande (Drinks)
  {
    id: 'bevande-1',
    name: 'Acqua Minerale',
    description: 'Sparkling or still mineral water (750ml)',
    price: 3.50,
    category: 'Bevande',
    vegetarian: true,
  },
  {
    id: 'bevande-2',
    name: 'Vino Rosso',
    description: 'House red wine (glass)',
    price: 6.00,
    category: 'Bevande',
    vegetarian: true,
  },
  {
    id: 'bevande-3',
    name: 'Espresso',
    description: 'Traditional Italian espresso',
    price: 2.50,
    category: 'Bevande',
    vegetarian: true,
  },
];

export const categories = [
  'Antipasti',
  'Primi',
  'Pizza',
  'Secondi',
  'Dolci',
  'Bevande'
];
