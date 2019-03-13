/*
  Evan MacHale - N00150552
  12.03.19
  Weight.js
*/

import React from 'react';
import PropTypes from 'prop-types';
// Material Design Components
import Card, {
  CardActions,
  CardActionIcons
} from '@material/react-card';
import { Cell, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import IconButton from '@material/react-icon-button';
import { Body1 } from '@material/react-typography';

/*
  Card displays a saved geometry's weights
  Mapped over in Saves.js
*/

const WeightCard = (props) => {
  const { name } = props;
  const { loadWeights } = props;
  const { deleteWeights } = props;
  const { data } = props;
  return (
    <React.Fragment>
      <Row>
        <Cell columns={4} />
        <Cell columns={4}>
          <Card>
            <CardActions>
              <Body1>{name}</Body1>

              <CardActionIcons>
                <IconButton onClick={() => deleteWeights(data.weightId)}>
                  <MaterialIcon icon="fiber_manual_record" />
                </IconButton>
                <IconButton onClick={() => loadWeights(data)}>
                  <MaterialIcon icon="play_arrow" />
                </IconButton>
              </CardActionIcons>
            </CardActions>
          </Card>
        </Cell>
        <Cell columns={4} />
      </Row>
      <br />
      <br />
    </React.Fragment>
  );
};

WeightCard.propTypes = {
  name: PropTypes.string.isRequired,
  loadWeights: PropTypes.func.isRequired,
  deleteWeights: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default WeightCard;
