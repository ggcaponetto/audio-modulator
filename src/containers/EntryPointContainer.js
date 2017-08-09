import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EntryPoint from '../components/EntryPoint';
import * as Actions from '../actions/actionCreators';

const mapStateToProps = state => ({
  ws: state.ws
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

const EntryPointContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPoint);

export default EntryPointContainer;
