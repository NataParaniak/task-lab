import { expect as chaiExpect, assert } from 'chai';
import * as chai from 'chai';
import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'

chai.should();

describe('Login', () => {
    it('should login', async () => {
        await LoginPage.open();
        await LoginPage.login('tomsmith', 'SuperSecretPassword!');

        // WDIO
        await expect(SecurePage.flashAlert).toBeExisting();

        const text = await SecurePage.flashAlert.getText();

        // Chai Expect
        chaiExpect(text).to.contain('You logged into a secure area!');

        // Chai Assert
        assert.include(text, 'You logged into a secure area!');

        // Chai Should
        (text as any).should.contain('You logged into a secure area!');
        
    });
});

