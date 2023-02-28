// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';


const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmTransaction, setATMTransaction] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (e) => {
    console.log(Number(e.target.value));
    if (Number(e.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (atmTransaction === 'Cash Back' && Number(e.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    e.preventDefault();
  };

  const handleModeSelect = (e) => {
    console.log(e.target.value);
    setATMTransaction(e.target.value);
    setValidTransaction(false);
    if (e.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <>
        <div className="container-sm text-dark">
        <h2 id="total">{status}</h2>

          <div className="row row-cols-2 gx-4">

            <div className="col-3 ">
              <label className="form-label fw-bold text-secondary">Select an action below to continue</label>
              <div className="form-control border p-3 bg-secondary text-light">
                <select className="form-select" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select" >
                  <option selected id="no-selection" value="">Choose...</option>
                  <option id="deposit-selection" value="Deposit">  Deposit  </option>
                  <option id="cashback-selection" value="Cash Back">  Cash Back  </option>
                </select>

                {atmTransaction && (
                  <ATMDeposit
                    onChange={handleChange}
                    isDeposit={isDeposit}
                    isValid={validTransaction}
                  ></ATMDeposit>
                )}
              </div>
            </div>


            <div className="col-6 col-sm-7 col-md-7">
              <img alt="atm" src="https://images.pexels.com/photos/3799220/pexels-photo-3799220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="400px"></img>
            </div>

            
          </div>
        </div>
      </>
    </form>
    
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
