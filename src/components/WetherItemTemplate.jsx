export default function WetherItemTemplate({ title, label, children }) {

    return (
        <li className="whether-item-template">
            <div className="whether-item-template__title-container title-container">
                <h4 className="title-container__title">{title}</h4>
                {label && <span className="title-container__sub-title">{label}</span>}
            </div>
            <div className="whether-item-template__content">
                {children}
            </div>
        </li>
    )
}
