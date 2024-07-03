 <DateInput
              minDate={moment(new Date()).format('DD.MM.YYYY')}
              disabled={disabled}
              className='date-input'
              placeholder='01.01.2022'
              name='docDate'
              dateFormat='DD.MM.YYYY'
              value={param?.docDate ?? ''}
              onChange={(e, { name, value }) => setParamByDocId(value, item.id, name, params, setParams)}
            />
