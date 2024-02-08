import { Suspense, memo, useDeferredValue, useRef, useState } from 'react';

const Select = memo(function Select({
    handleSelected,
    data,
    disabled,
    cleanOnChange,
    forActionOnUpdate,
    placeholder,
    setCitiesQuery,
    isLoading = false
}) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef();
    const deferedQuery = useDeferredValue(query);
    const isSame = deferedQuery === query;
    const dataByQuery = (data.length > 0 && query.length > 0) ? data.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase())) : [];

    if (disabled && query.length) {
        setQuery('');
    }

    function handleQuery(e) {
        setQuery(e.target.value)

        if (isSame && setCitiesQuery) {
            setCitiesQuery(e.target.value)
        }

        let cleanValues = {}
        cleanValues[forActionOnUpdate] = null;
        if (cleanOnChange?.length) {
            cleanOnChange.forEach(key => {
                cleanValues[key] = null
            });
        }
        handleSelected(cleanValues);
    }

    function handleOnChange(data) {
        handleFocusOut();
        setQuery(data.name);
        handleSelected(data, forActionOnUpdate);
    }

    function handleKey({ key }) {
        const data = dataByQuery.length && dataByQuery.find(({ name }) => name === query);
        if (key === "Enter" && !!data) {
            handleOnChange(data);
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
                placeholder={placeholder}
            />
            {(isFocused && query.length > 0) &&
                <Suspense fallback={<h2>Loading...</h2>}>
                    <ul style={!isSame && { opacity: '0.5' } || {}} className='select__content'>
                        {dataByQuery.length ?
                            dataByQuery.map((el) =>
                                <li
                                    key={el.id || el.ID}
                                    className='select__item'
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleOnChange(el)}>
                                    {el.name}
                                </li>
                            ) :
                            (<h2>Поиск пуст!</h2>)
                        }
                    </ul>
                </Suspense>

            }
        </div>
    );
});

export default Select;