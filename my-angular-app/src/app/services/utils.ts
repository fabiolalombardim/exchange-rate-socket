import { Account } from "../models/account.model";
import { BalanceRegistry } from "../models/balance-registry";

export const flashRow = (accountId: string, color: string, detail: boolean) => {
  const accountRow = !detail ? document.getElementById(`${accountId}`) : document.getElementById('available-balance');
  console.log(accountRow)
  if (accountRow) {
    // Reset the color instantly before applying a new flash
    accountRow.style.transition = 'none'; // Disable transition temporarily
    accountRow.style.backgroundColor = ''; // Reset background color to default

    setTimeout(() => {
      accountRow.style.transition = 'background-color 0.5s ease';
      accountRow.style.backgroundColor = color;

      setTimeout(() => {
        accountRow.style.backgroundColor = ''; // Reset to original color
      }, 1000); // The duration of the color flash
    }, 50); // Small delay to force a repaint
  }
}

const GREEN = 'rgba(0,255,0,0.3)';
const RED = 'rgba(255,0,0,0.3)';

// Compare old account available_balance and new account available_balance to flash
// in home(list) and detail's page
export const compare = (old: Account, updated: BalanceRegistry, detail: boolean) => {
  if (Number(old.available_balance) < Number(updated.newAvailableBalance)) {
    flashRow(updated.accountId, GREEN, detail); // Flash red if available balance decreased
  } else if (Number(old.available_balance) > Number(updated.newAvailableBalance)) {
    flashRow(updated.accountId, RED, detail); // Flash green if available balance increased
  }
}
