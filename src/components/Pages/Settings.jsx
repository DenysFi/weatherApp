import { useDispatch, useSelector } from "react-redux";
import { setUnits } from "../../state/settings/settingsSlice";

const Settings = () => {
    const unit = useSelector((state) => state.settings.unit);
    const dispatch = useDispatch();
    return (
        <section className="settings">
            <div className="settings__container">
                <div className="settings__content">
                    <h3 className="settings__title">Settings</h3>
                    <ul className="settings__list">
                        <li className="settings__item">
                            <p className="settings__label">Единицы измерения</p>
                            <select onChange={(e) => dispatch(setUnits(e.target.value))} value={unit} name="" id="" className="settings__select">
                                <option value="Metric">Метрические (°C, км/ч, мм)</option>
                                <option value="Imperial">Британские (°F, миль/ч, дюйм)</option>
                            </select>
                        </li>
                        <li className="settings__item">
                            <p className="settings__label">Язык</p>
                            <select name="" id="" className="settings__select">
                                <option value="ru">Русский</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Settings;
