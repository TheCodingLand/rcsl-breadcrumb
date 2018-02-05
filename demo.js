import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Numéro RCS', 'Formulaire', 'Publication','Autre document', 'Vérifications', 'Ajouter au panier', 'Valider le panier','Que faire ensuite ?'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Entrez le Numéro RCS';
    case 1:
      return 'Remplissez ce formulaire, et passez ensuite à l\'étape suitante';
    case 2:
      return 'Document à publier : veuillez charger un fichier au format pdf/a texte... prerequis : ...';
    case 3:
      return 'Autre document : veuillez charger un fichier au format pdf/a';
    case 4:
      return 'Veuillez vérifier que le dossier est complet et correspond aux changements à effectier au dossier de la société B...';
    case 5:
      return 'Ajouter votre demande au panier ? ';
    case 6: 
      return 'Pour Valider le panier, vous allez être redirigé sur ...'
    case 7:
      return 'Vous recevrez un email et une confirmation de traitement, voici les étapes à suivre ensuite .... '

    default:
      return 'Uknown stepIndex';
  }
}

class HorizontalLabelPositionBelowStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
               Terminé !
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="raised" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
