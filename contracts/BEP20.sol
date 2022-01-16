// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import  "./IBEP20.sol";
import  "./Ownable.sol";
import  "./SafeMath.sol";

contract BEP20 is Context, IBEP20, Ownable {
  using SafeMath for uint256;
  uint256 constant thirtyDays = 2592000;
  uint256 constant cliffSixM       = 6;
  uint256 constant cliffFourM      = 4;
  uint256 constant cliffThreeM     = 3;
  uint256 constant cliffTwoM       = 2;

  mapping (address => uint256) private _balances;

  mapping (address => mapping (address => uint256)) private _allowances;

  uint256 private _totalSupply;
  uint256 private _totalSupply_6M;
  uint256 private _totalSupply_4M;
  uint256 private _totalSupply_3M;
  uint256 private _totalSupply_2M;

  bool    private _initialMintIsDone;
  bool    private _authoriseMin_6M;
  bool    private _authoriseMin_4M;
  bool    private _authoriseMin_3M;
  bool    private _authoriseMin_2M;

  uint256 immutable private _maxSupply;
  uint256 immutable private _maxSupply_6M;
  uint256 immutable private _maxSupply_4M;
  uint256 immutable private _maxSupply_3M;
  uint256 immutable private _maxSupply_2M;

  uint256 private _associatesMonthlySupply;
  uint256 private _teamMonthlySupply;
  uint256 private _seedMonthlySupply;
  uint256 private _privSaleMonthlySupply;
  uint256 private _marketingMonthlySupply;
  uint256 private _icoRound1MonthlySupply;
  uint256 private _icoRound2MonthlySupply;
  uint256 private _reserveMonthlySupply;

  uint256 private _associatesEndOfIcoSupply;
  uint256 private _teamEndOfIcoSupply;
  uint256 private _seedEndOfIcoSupply;
  uint256 private _privSaleEndOfIcoSupply;
  uint256 private _marketingEndOfIcoSupply;
  uint256 private _icoRound1EndOfIcoSupply;
  uint256 private _icoRound2EndOfIcoSupply;
  uint256 private _icoRound3EndOfIcoSupply;
  uint256 private _reserveEndOfIcoSupply;

  uint8   private _decimals;
  string  private _symbol;
  string  private _name;

  uint256 private _endOfICO;
  uint256 private _endOfReserveCliff;

  uint256 private _startTime_2M;
  uint256 private _startTime_3M;
  uint256 private _startTime_4M;
  uint256 private _startTime_6M;

  address private _associatesAdd;
  address private _teamAdd;
  address private _seedAdd;
  address private _marketingAdd;
  address private _privSaleAdd;
  address private _icoRound1Add;
  address private _icoRound2Add;
  address private _icoRound3Add;
  address private _reserveAdd;

  constructor(address associatesAdd, address teamAdd, address seedAdd,address privSaleAdd, address marketingAdd, address icoRound1Add , address icoRound2Add, address icoRound3Add, address reserveAdd )  {
    _name                 = "Artrade Token";
    _symbol               = "ATR";
    _decimals             = 9;
    _balances[msg.sender] = 0;

    _endOfICO             = 1644879600; // 2022/02/15 00:00:00
    _endOfReserveCliff    = 1707951600; // 2024/02/15 00:00:00
    _startTime_2M         = 1649973600; // 2022/04/15 00:00:00
    _startTime_3M         = 1652565600; // 2022/05/15 00:00:00
    _startTime_4M         = 1655244000; // 2022/06/15 00:00:00
    _startTime_6M         = 1660514400; // 2022/08/15 00:00:00

    _associatesMonthlySupply     = 8493000  * (10 ** uint256(_decimals)); //
    _teamMonthlySupply           = 6650000  * (10 ** uint256(_decimals)); //
    _seedMonthlySupply           = 6602500  * (10 ** uint256(_decimals)); //
    _privSaleMonthlySupply       = 1498500  * (10 ** uint256(_decimals)); //
    _marketingMonthlySupply      = 5400000  * (10 ** uint256(_decimals)); //
    _icoRound1MonthlySupply      = 21250000 * (10 ** uint256(_decimals)); //
    _icoRound2MonthlySupply      = 60000000 * (10 ** uint256(_decimals)); //
    _reserveMonthlySupply        = 17600000 * (10 ** uint256(_decimals)); //

    _associatesEndOfIcoSupply    = 8046000   * (10 ** uint256(_decimals));
    _teamEndOfIcoSupply          = 6300000   * (10 ** uint256(_decimals));
    _seedEndOfIcoSupply          = 6255000   * (10 ** uint256(_decimals));
    _privSaleEndOfIcoSupply      = 1998000   * (10 ** uint256(_decimals));
    _marketingEndOfIcoSupply     = 7200000   * (10 ** uint256(_decimals));
    _icoRound1EndOfIcoSupply     = 22500000  * (10 ** uint256(_decimals));
    _icoRound2EndOfIcoSupply     = 60000000  * (10 ** uint256(_decimals));
    _icoRound3EndOfIcoSupply     = 450000000 * (10 ** uint256(_decimals));
    _reserveEndOfIcoSupply       = 79200000  * (10 ** uint256(_decimals));


    _maxSupply_6M         = 708219000   * (10 ** uint256(_decimals));
    _maxSupply_4M         = 82782000    * (10 ** uint256(_decimals));
    _maxSupply_3M         = 127500000   * (10 ** uint256(_decimals));
    _maxSupply_2M         = 240000000   * (10 ** uint256(_decimals));

    _maxSupply            = 1800000000 * (10 ** uint256(_decimals)); // 1,8 MD

    _initialMintIsDone    = false;
    _authoriseMin_6M      = true;
    _authoriseMin_4M      = true;
    _authoriseMin_3M      = true;
    _authoriseMin_2M      = true;


    _associatesAdd        = associatesAdd;
    _teamAdd              = teamAdd;
    _seedAdd              = seedAdd;
    _marketingAdd         = marketingAdd;
    _privSaleAdd          = privSaleAdd;
    _icoRound1Add         = icoRound1Add;
    _icoRound2Add         = icoRound2Add;
    _icoRound3Add         = icoRound3Add;
    _reserveAdd           = reserveAdd;

  }

  /**
   * @dev Returns the bep token owner.
   */
  function getOwner() public view  override returns (address) {
    return owner();
  }
  /**
   * @dev Returns  associates address.
   */
  function getAssociatesAdd() external view returns (address) {
    return _associatesAdd;
  }

  /**
   * @dev Returns  team address.
   */
  function getTeamAdd() external view returns (address) {
    return _teamAdd;
  }

  /**
   * @dev Returns  team address.
   */
  function getSeedAdd() external view returns (address) {
    return _seedAdd;
  }

  /**
   * @dev Returns  team address.
   */
  function getMarketingAdd() external view returns (address) {
    return _marketingAdd;
  }

  /**
   * @dev Returns  Private Sale address.
   */
  function getPrivSaleAdd() external view returns (address) {
    return _privSaleAdd;
  }

  /**
   * @dev Returns  ICO Round 1 address.
   */
  function getICORound1Add() external view returns (address) {
    return _icoRound1Add;
  }

  /**
   * @dev Returns  ICO Round 2 address.
   */
  function getICORound2Add() external view returns (address) {
    return _icoRound2Add;
  }

  /**
   * @dev Returns  ICO Round 3 address.
   */
  function getICORound3Add() external view returns (address) {
    return _icoRound3Add;
  }

  /**
   * @dev Returns  reserve address.
   */
  function getReserveAdd() external view returns (address) {
    return _reserveAdd;
  }

  /**
   * @dev Returns the token decimals.
   */
  function decimals() public view  override returns (uint8) {
    return _decimals;
  }

  /**
   * @dev Returns the token symbol.
   */
  function symbol() public view  override returns (string memory) {
    return _symbol;
  }

  /**
  * @dev Returns the token name.
  */
  function name() public view  override returns (string memory) {
    return _name;
  }

  /**
   * @dev See {BEP20-totalSupply}.
   */
  function totalSupply() public view  override returns (uint256) {
    return _totalSupply;
  }

  /**
   * @dev See {BEP20-balanceOf}.
   */
  function balanceOf(address account) public view  override returns (uint256) {
    return _balances[account];
  }

  /**
   * @dev Returns the cap on the token's total supply.
   */
   function maxSupply() public view  returns (uint256) {
       return _maxSupply;
   }

  /**
   * @dev See {BEP20-startTime}.
   */
   function startTime() external view returns (uint256) {
      return _endOfICO;
   }

  /**
   * @dev See {BEP20-transfer}.
   *
   * Requirements:
   *
   * - `recipient` cannot be the zero address.
   * - the caller must have a balance of at least `amount`.
   */
  function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
    _transfer(_msgSender(), recipient, amount);
    return true;
  }

  /**
   * @dev See {BEP20-allowance}.
   */
  function allowance(address owner, address spender) public view  override returns (uint256) {
    return _allowances[owner][spender];
  }

  /**
   * @dev See {BEP20-approve}.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function approve(address spender, uint256 amount) public virtual  override returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
  }

  /**
   * @dev See {BEP20-transferFrom}.
   *
   * Emits an {Approval} event indicating the updated allowance. This is not
   * required by the EIP. See the note at the beginning of {BEP20};
   *
   * Requirements:
   * - `sender` and `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   * - the caller must have allowance for `sender`'s tokens of at least
   * `amount`.
   */
  function transferFrom(address sender, address recipient, uint256 amount) public virtual  override returns (bool) {
    _transfer(sender, recipient, amount);
    _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "BEP20: transfer amount exceeds allowance"));
    return true;
  }

  /**
   * @dev Atomically increases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {BEP20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
    _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
    return true;
  }

  /**
   * @dev Atomically decreases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {BEP20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   * - `spender` must have allowance for the caller of at least
   * `subtractedValue`.
   */
  function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
    _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "BEP20: decreased allowance below zero"));
    return true;
  }

  /** @dev Creates `amount` tokens and assigns them to the right
	 * adresses (associatesAdd, teamAdd, seedAdd, privSaleAdd,
	 * marketingAdd, icoRound1Add , icoRound2Add, icoRound3Add,
	 * reserveAdd), increasing _totalSupply_XM sub-supplies and
	 * the total supply
  */
  function mint(uint256 amount) public returns (bool) {
    require(block.timestamp > _endOfICO, "BEP20: Minting is only allowed after the end of ICO --> 2022/02/15 00:00:00");
    if ( (block.timestamp > _endOfICO)  && !_initialMintIsDone){
        _mint(_associatesAdd, _associatesEndOfIcoSupply);
        _mint(_teamAdd, _teamEndOfIcoSupply);
        _mint(_seedAdd, _seedEndOfIcoSupply);
        _mint(_privSaleAdd, _privSaleEndOfIcoSupply);
        _mint(_marketingAdd, _marketingEndOfIcoSupply);
        _mint(_icoRound1Add, _icoRound1EndOfIcoSupply);
        _mint(_icoRound2Add, _icoRound2EndOfIcoSupply);
        _mint(_icoRound3Add, _icoRound3EndOfIcoSupply);
        _mint(_reserveAdd, _reserveEndOfIcoSupply);
        _initialMintIsDone = true;
    }
      if ( _initialMintIsDone){
        if ( amount == cliffSixM){
          if (  block.timestamp > _startTime_6M.add(thirtyDays)){
             _startTime_6M = _startTime_6M.add(thirtyDays);
             _authoriseMin_6M = true;
          }
          if ((block.timestamp >= _startTime_6M ) && _authoriseMin_6M){
            require(_totalSupply_6M.add(_associatesMonthlySupply).add(_teamMonthlySupply).add(_seedMonthlySupply).add(_reserveMonthlySupply) <= _maxSupply_6M, "BEP20: Assocites, Team and Seed cap exceeded");
            require(_totalSupply.add(_associatesMonthlySupply).add(_teamMonthlySupply).add(_seedMonthlySupply) <= maxSupply(), "BEP20: cap exceeded");
            _mint(_associatesAdd, _associatesMonthlySupply);
            _mint(_teamAdd, _teamMonthlySupply);
            _mint(_seedAdd, _seedMonthlySupply);
            _mint(_reserveAdd, _reserveMonthlySupply);
            _totalSupply_6M   = _totalSupply_6M.add(_associatesMonthlySupply).add(_teamMonthlySupply).add(_seedMonthlySupply).add(_reserveMonthlySupply);
            _authoriseMin_6M = false;
          }
        }

        if ( amount == cliffFourM){
          if (  block.timestamp > _startTime_4M.add(thirtyDays)){
             _startTime_4M = _startTime_4M.add(thirtyDays);
             _authoriseMin_4M = true;
          }
          if ((block.timestamp >= _startTime_4M ) && _authoriseMin_4M){
            require(_totalSupply_4M.add(_privSaleMonthlySupply).add(_marketingMonthlySupply) <= _maxSupply_4M, "BEP20: Marketing and Private Sale cap exceeded");
            require(_totalSupply.add(_privSaleMonthlySupply).add(_marketingMonthlySupply) <= maxSupply(), "BEP20: cap exceeded");
            _mint(_privSaleAdd, _privSaleMonthlySupply);
            _mint(_marketingAdd, _marketingMonthlySupply);
            _totalSupply_4M   = _totalSupply_4M.add(_privSaleMonthlySupply).add(_marketingMonthlySupply);
            _authoriseMin_4M = false;
          }

        }
        if ( amount == cliffThreeM){
          if (  block.timestamp > _startTime_3M.add(thirtyDays)){
             _startTime_3M = _startTime_3M.add(thirtyDays);
             _authoriseMin_3M = true;
          }
          if ((block.timestamp >= _startTime_3M ) && _authoriseMin_3M){
            require(_totalSupply_3M.add(_icoRound1MonthlySupply)<= _maxSupply_3M, "BEP20: ICO Round 1 cap exceeded");
            require(_totalSupply.add(_icoRound1MonthlySupply) <= maxSupply(), "BEP20: cap exceeded");
            _mint(_icoRound1Add, _icoRound1MonthlySupply);
            _totalSupply_3M   = _totalSupply_3M.add(_icoRound1MonthlySupply);
            _authoriseMin_3M = false;
          }

        }
        if ( amount == cliffTwoM){
          if (  block.timestamp > _startTime_2M.add(thirtyDays)){
             _startTime_2M = _startTime_2M.add(thirtyDays);
             _authoriseMin_2M = true;
          }
          if ((block.timestamp >= _startTime_2M ) && _authoriseMin_2M){
            require(_totalSupply_2M.add(_icoRound2MonthlySupply)<= _maxSupply_2M, "BEP20: ICO Round 2 cap exceeded");
            require(_totalSupply.add(_icoRound2MonthlySupply) <= maxSupply(), "BEP20: cap exceeded");
            _mint(_icoRound2Add, _icoRound2MonthlySupply);
            _totalSupply_2M   = _totalSupply_2M.add(_icoRound2MonthlySupply);
            _authoriseMin_2M = false;
          }

        }
      }
    return true;
  }


  /**
    * @dev Destroys `amount` tokens from the caller.
    *
    * See {ERC20-_burn}.
    */
  function burn(uint256 amount) public returns (bool) {
    _burn(_msgSender(), amount);
    return true;
  }

  /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address account, uint256 amount) public returns (bool) {
        _burnFrom(account, amount);
        return true;
    }

  /**
   * @dev Moves tokens `amount` from `sender` to `recipient`.
   *
   * This is internal function is equivalent to {transfer}, and can be used to
   * e.g. implement automatic token fees, slashing mechanisms, etc.
   *
   * Emits a {Transfer} event.
   *
   * Requirements:
   *
   * - `sender` cannot be the zero address.
   * - `recipient` cannot be the zero address.
   * - `sender` must have a balance of at least `amount`.
   */
  function _transfer(address sender, address recipient, uint256 amount) internal virtual {
    require(sender != address(0), "BEP20: transfer from the zero address");
    require(recipient != address(0), "BEP20: transfer to the zero address");
    // condition  chaque mois

    _balances[sender] = _balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
    _balances[recipient] = _balances[recipient].add(amount);
    emit Transfer(sender, recipient, amount);
  }

  /** @dev Creates `amount` tokens and assigns them to `account`, increasing
   * the total supply.
   *
   * Emits a {Transfer} event with `from` set to the zero address.
   *
   * Requirements
   *
   * - `to` cannot be the zero address.
   */
  function _mint(address account, uint256 amount) internal {
    require(account != address(0), "BEP20: mint to the zero address");

    _totalSupply = _totalSupply.add(amount);
    _balances[account] = _balances[account].add(amount);
    emit Transfer(address(0), account, amount);
  }

  /**
   * @dev Destroys `amount` tokens from `account`, reducing the
   * total supply.
   *
   * Emits a {Transfer} event with `to` set to the zero address.
   *
   * Requirements
   *
   * - `account` cannot be the zero address.
   * - `account` must have at least `amount` tokens.
   */
  function _burn(address account, uint256 amount) internal {
    require(account != address(0), "BEP20: burn from the zero address");

    _balances[account] = _balances[account].sub(amount, "BEP20: burn amount exceeds balance");
    _totalSupply = _totalSupply.sub(amount);
    emit Transfer(account, address(0), amount);
  }

  /**
   * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
   *
   * This is internal function is equivalent to `approve`, and can be used to
   * e.g. set automatic allowances for certain subsystems, etc.
   *
   * Emits an {Approval} event.
   *
   * Requirements:
   *
   * - `owner` cannot be the zero address.
   * - `spender` cannot be the zero address.
   */
  function _approve(address owner, address spender, uint256 amount) internal virtual {
    require(owner != address(0), "BEP20: approve from the zero address");
    require(spender != address(0), "BEP20: approve to the zero address");

    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }

  /**
   * @dev Destroys `amount` tokens from `account`.`amount` is then deducted
   * from the caller's allowance.
   *
   * See {_burn} and {_approve}.
   */
  function _burnFrom(address account, uint256 amount) internal {
    _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "BEP20: burn amount exceeds allowance"));
    _burn(account, amount);
  }


}
