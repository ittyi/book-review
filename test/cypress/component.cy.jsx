import Element from '../../src/component'

it('titleが有る場合', function () {
  // /API/itemDataのレスポンスを改ざんする
  cy.intercept('GET', '/API/itemData', {
    statusCode: 201,
    body: {
      // response.json()実行時の戻り値を以下に改ざんする
      title: '任意のタイトル',
    },
  }).as('request')

  cy.mount(<Element />)
  //titleの正常表示確認
  cy.get('#title').should('have.text', '任意のタイトル')
})