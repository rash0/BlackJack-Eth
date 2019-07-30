<template>
  <div class="account-amount">
    <div class="notifi">
      <div class="arrow-up"></div>
      <div class="table-body">
        <table>
          <tr>
            <th>
              <img src="https://img.icons8.com/small/20/000000/user.png" />
            </th>
            <th>
              <img src="https://img.icons8.com/small/20/000000/gingerbread-house.png" />
            </th>
            <th>
              <img src="../assets/chip.png" width="17" />
            </th>
          </tr>
          <tr>
            <td>12</td>
            <td>13</td>
            <td>0.1</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>13</td>
            <td>21</td>
            <td>0.25</td>
          </tr>
        </table>
      </div>
    </div>0.5 ETH
  </div>
</template>

<script>
export default {
  name: "Wallet"
};
</script>

<style>
.account-amount {
  align-self: center;
  margin-left: 1rem;
  font-size: 13px;
  font-weight: 300;
}

.account-amount:hover .notifi,
.notifi:hover {
  opacity: 1 !important;
}

.notifi {
  background: #f1f1f1;
  display: block;
  opacity: 0;
  border-radius: 4px;
  position: absolute;
  width: 9rem;
  height: 13rem;
  right: 15px;
  top: 7.3%;
  padding: 0px 8px 8px 8px;
  cursor: default;
  transition: opacity 0.5s;
}

.notifi .table-body {
  width: 100%;
  height: 5rem;
 overflow-y: scroll;
  scrollbar-color: rebeccapurple transparent;
  scrollbar-width: thin;
  margin-left: 4px;
}

.notifi table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  background: white;
  border-radius: 4px;
  width: 100%;
  padding: 5px;
  font-size: 13px;
  border-collapse: collapse;
  border: 0.7px solid #cbd5e0;
  border-radius: 4px;
}
.notifi th {
  height: 1.7rem;
}
.notifi tr:nth-child(even) {
  background-color: #f2f2f2;
  height: 1.2rem;
}
.arrow-up {
  position: relative;
  width: 1px;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #f1f1f1;
  left: 115px;
  bottom: 10px;
}
</style>
