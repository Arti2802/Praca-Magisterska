export const UnderlineNav = ({page, link_idx}) => {
    const links = [
        ["informacje", "piosenki", "panstwa", "kolejnosc-wystepow"],
        ["edytuj", "wybierz-panstwa", "zgloszenia", "ustal-polfinaly", "ustal-kolejnosc-wystepow"],
        ["ustawienia", "zaproszenie", "czlonkowie"]
    ];
    const labels = [
        ["Ogólne", "Piosenki", "Państwa", "Kolejność występów"],
        ["Ogólne", "Wybór państw", "Zgłoszenia", "Półfinały", "Kolejność występów"],
        ["Ustawienia", "Zaproszenie", "Członkowie"]
    ];
    return (
        <ul className="nav nav-underline mb-3">
            {links.at(link_idx).map((link, index) => (
                <li className="nav-item" key={index}>
                    <a className={`nav-link ${page === link ? 'active' : null}`} href={link}>{labels.at(link_idx).at(index)}</a>
                </li>
            ))}
        </ul>
    );
}