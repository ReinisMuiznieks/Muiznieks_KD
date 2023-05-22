import './credits.scss'
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Container from 'react-bootstrap/esm/Container';
import Stack from 'react-bootstrap/Stack';

const Credits = () => {

    return (
<>
<NavbarTop />
    <Container>
        <h1 id='title'>Card Image Attributions</h1>

        <Stack className="credits-stack">
            <a href="https://www.flaticon.com/free-stickers/number" title="number stickers">Number stickers created by Stickers - Flaticon</a>
            <a href="https://www.flaticon.com/free-stickers/transportation" title="transportation stickers">Transportation stickers created by Stickers - Flaticon</a>
            <a href="https://www.flaticon.com/stickers-pack/fruits-124" title="fruit stickers">Fruit stickers created by Gohsantosadrive - Flaticon</a>
            <a href="https://www.flaticon.com/stickers-pack/vegetables-156" title="vegetable stickers">Vegetable stickers created by Gohsantosadrive - Flaticon</a>
            <a href="https://www.flaticon.com/stickers-pack/sport-item" title="sport item stickers">Sport item stickers created by Gohsantosadrive - Flaticon</a>
            <a href="https://www.flaticon.com/stickers-pack/planner-29" title="planner stickers">Planner stickers created by alien.studio - Flaticon</a>
            <a href="https://www.flaticon.com/stickers-pack/arrows-866" title="arrows stickers">Arrows stickers created by Stickers - Flaticon</a>
            <a href="https://www.flaticon.com/stickers-pack/emotions-42" title="emotions stickers">Emotions stickers created by Stickers - Flaticon</a>
            <a href="https://www.flaticon.com/stickers-pack/weather-555" title="weather stickers">Weather stickers created by Stickers - Flaticon</a>
            <a href="https://www.flaticon.com/stickers-pack/people-activity-1" title="activity stickers">Activity stickers created by bukeicon - Flaticon</a>
        </Stack>
    </Container>

</>
    )
}

export default Credits;
