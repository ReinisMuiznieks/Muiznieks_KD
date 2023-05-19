import './credits.scss'
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Container from 'react-bootstrap/esm/Container';
import Stack from 'react-bootstrap/Stack';

const Credits = () => {

    return (
<>
<NavbarTop />
    <Container>
        <h1 id='title'>Card Image Attributions</h1>

        <Stack className="credits-stack">
            <a href="https://www.flaticon.com/free-stickers/fruit">Fruits and Vegetables stickers pack by Stickers - Flaticon</a>
            <a href="https://www.flaticon.com/stickers-pack/days-of-the-week-months-and-seasons">Days of the week months and seasons stickers pack by Stickers - Flaticon</a>
            <a href="https://www.flaticon.com/free-stickers/number" title="number stickers">Number stickers created by Stickers - Flaticon</a>
            <a href="https://www.flaticon.com/free-stickers/there" title="there stickers">There stickers created by Stickers - Flaticon</a>
            <a href="https://www.flaticon.com/free-stickers/transportation" title="transportation stickers">Transportation stickers created by Stickers - Flaticon</a>
        </Stack>
    </Container>

<Footer/>

</>
    )
}

export default Credits;
