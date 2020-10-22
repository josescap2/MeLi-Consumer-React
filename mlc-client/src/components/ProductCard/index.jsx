import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minHeight: 500,
    margin: "16px auto",
    border: "grey .5px solid",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  media: {
    minHeight: 350,
    maxHeight: 350,
  },
});

export default function({ title = "", image = "", price = 0.0, money = "ARS", stock = 0, permalink}) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <Link href={permalink} target="_blank" color="inherit">
          <CardMedia
            className={classes.media}
            image={image}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {price} {money} - {stock === 0 ? "SIN STOCK" : stock === 1 ? "1 Disponible" : stock + " Disponibles"}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Button color="primary">
          <Link href={permalink} target="_blank">
            Ver más
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
