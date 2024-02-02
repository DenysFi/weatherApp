import { memo, useRef, useState } from 'react';

const Select = memo(function Select({ handleSelected, data, disabled, cleanOnChange, forActionOnUpdate }) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef();
    const dataByQuery = (data.length > 0 && query.length > 0) ? data.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase())) : [];

    if (disabled && query.length) {
        setQuery('');
    }

    function handleQuery(e) {
        setQuery(e.target.value)

        let cleanValues = {}
        cleanValues[forActionOnUpdate] = '';
        if (cleanOnChange?.length) {
            cleanOnChange.forEach(key => {
                cleanValues[key] = ''
            });
        }
        handleSelected(cleanValues);
    }

    function handleOnChange(name) {
        handleFocusOut();
        setQuery(name);
        handleSelected(name, forActionOnUpdate);
    }

    function handleKey({ key }) {
        const data = dataByQuery.length && dataByQuery.find(({ name }) => name === query);
        if (key === "Enter" && !!data) {
            handleOnChange(data.name);
        }
    }

    const handleFocusOut = () => {
        setIsFocused(false);
        inputRef.current.blur();
    }

    return (
        <div className="select" >
            <input
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={handleFocusOut}
                value={query}
                onChange={handleQuery}
                onKeyDown={handleKey}
                ref={inputRef}
                disabled={disabled}
            />
            {(isFocused && query.length > 0) &&
                <ul className='select__content'>
                    {dataByQuery.length ?
                        dataByQuery.map(({ name, id }) =>
                            <li
                                key={id}
                                className='select__item'
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleOnChange(name)}>
                                {name}
                            </li>
                        ) :
                        (<h2>Страна не найдена!</h2>)
                    }
                </ul>
            }
        </div>
    );
});

export default Select;