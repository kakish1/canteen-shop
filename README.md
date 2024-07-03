<MaskedInput
        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
        placeholder="DD.MM.YYYY"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        render={(ref, props) => (
          <DateInput
            minDate={moment(new Date()).format('DD.MM.YYYY')}
            disabled={disabled}
            className='date-input'
            placeholder='01.01.2022'
            name='docDate'
            dateFormat='DD.MM.YYYY'
            value={inputValue}
            onChange={handleDateChange}
            inputRef={ref}
            {...props}
          />
        )}
      />
