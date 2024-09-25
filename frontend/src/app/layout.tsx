import ReduxProvider from '@/store/provider';
import './globals.css';

export const metadata = {
  title: 'Delicious Recipes',
  description: 'Explore a variety of mouth-watering recipes, cooking tips, and culinary inspiration for every occasion.',
  keywords: 'recipes, cooking, food, culinary, easy recipes, healthy recipes, dessert recipes, dinner ideas',
  icons: {
    icon: '\assets\images\fav-icon.png', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
