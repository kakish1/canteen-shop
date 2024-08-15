import React, { useState, useContext } from 'react'
import { Accordion, Grid, Form, Button, Icon } from 'semantic-ui-react'
import { CommonData } from '../../../context'
import './index.css'
export const AccountInfo = (props) => {
  const context = useContext(CommonData)
  const {
    accountRefresh,
    onAccountChange,
    account,
    fromThirdPersonAcc,
    setFromThirdPersonAcc,
    thirdPersonIIN,
    setThirdPersonIIN,
    thirdPersonName,
    getThirdPersonData
  } = context
  
  const [activeIndex, setActiveIndex] = useState(0)
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }
  return (
    <div className='ui form mini'>
      <Accordion fluid styled>
        <Accordion.Title
          className='accountInfoAccordionTitle'
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
            ИНФОРМАЦИЯ ПО СЧЕТУ
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0} className='accountInfoAccordion'>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Form.Checkbox
                  label='Списание комиссии со счета третьего лица'
                  checked={fromThirdPersonAcc}
                  onChange={(e, data) => setFromThirdPersonAcc(data.checked)}
                />
              </Grid.Column>
            </Grid.Row>
            {
              fromThirdPersonAcc &&
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Form.Input
                      label='ИИН/БИН третьего лица'
                      value={thirdPersonIIN}
                      fluid
                      onChange={e => setThirdPersonIIN(e.target.value)}
                      disabled={props.disabled}
                    />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Form.Input
                      label='Наименование третьего лица'
                      value={thirdPersonName}
                      fluid
                      disabled
                    />
                  </Grid.Column>
                  <Grid.Column width={3} verticalAlign='bottom'>
                    <Button onClick={getThirdPersonData} disabled={props.disabled}>
                          Поиск третьего лица
                    </Button>
                  </Grid.Column>
                </Grid.Row>
            }
            <Grid.Row columns={4}>
              <Grid.Column>
                <Form.Select
                  fluid
                  label='Номер текущего счета заемщика/третьего лица'
                  options={props.accounts}
                  value={account.code || ''}
                  onChange={onAccountChange}
                  name='CODE'
                  disabled={props.disabled}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  label='Остаток на счете'
                  value={account.balance || 0}
                  disabled
                />
              </Grid.Column>
              <Grid.Column >
                <Form.Input
                  fluid
                  label='Сумма неснижаемого остатка'
                  value={account.minbalanceamount || 0}
                  disabled
                />
              </Grid.Column>
              <Grid.Column >
                <Form.Input
                  fluid
                  label='Валюта счета'
                  value={account.currency || ''}
                  disabled
                />
              </Grid.Column>
              <Grid.Column verticalAlign='bottom'>
                <Button onClick={accountRefresh}>
                      Обновить
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Accordion.Content>
      </Accordion>
    </div>
  )
}
