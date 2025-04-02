export const UnderlineNav = ({page, link_idx}) => {
    const links = [
        ["informacje", "piosenki", "panstwa", "kolejnosc-wystepow"],
        ["edytuj", "wybierz-panstwa", "zgloszenia", "ustal-kolejnosc-wystepow"]
    ];
    const labels = [
        ["Ogólne", "Piosenki", "Państwa", "Kolejność występów"],
        ["Ogólne", "Wybór państw", "Zgłoszenia", "Kolejność występów"]
    ];
    return (
        <ul className="nav nav-underline">
            {links.at(link_idx).map((link, index) => (
                <li className="nav-item">
                    <a className={`nav-link ${page === link ? 'active' : null}`} href={link}>{labels.at(link_idx).at(index)}</a>
                </li>
            ))}
        </ul>
    );
}