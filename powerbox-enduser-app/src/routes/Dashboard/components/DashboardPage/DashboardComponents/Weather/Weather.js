import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	content: {
		alignItems: 'center',
		display: 'flex'
	},
	title: {
		fontWeight: 70
	},
	avatar: {
		backgroundColor: theme.palette.error.main,
		height: 56,
		width: 56
	},
	icon: {
		height: 32,
		width: 32
	},
	difference: {
		marginTop: theme.spacing(2),
		display: 'flex',
		alignItems: 'center'
	},
	differenceIcon: {
		color: theme.palette.error.dark
	},
	differenceValue: {
		color: theme.palette.error.dark,
		marginRight: theme.spacing(1)
	}
}));

const Weather = props => {
	const { className, ...rest } = props;
	const [weatherData, setWeatherData] = useState({});
	const classes = useStyles();

	//Get weather data from open weather API

	const getWeather = async () => {
		const api_call = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=oulu,fi&appid=c6cd43a6dc304bb188851d339a3daf48`
		);
		const response = await api_call.json();
		console.log(response);
		setWeatherData(response);
	};

	useEffect(() => {
		getWeather();
	}, []);

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent>
				<Grid container justify='space-between'>
					<Grid item>
						<Typography
							className={classes.title}
							color='textSecondary'
							gutterBottom
							variant='body2'
						>
							Oulu, Finland
						</Typography>
						{weatherData.main && (
							<Typography variant='h5'>
								{weatherData.main.temp}
							</Typography>
						)}
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<MoneyIcon className={classes.icon} />
						</Avatar>
					</Grid>
				</Grid>
				<div className={classes.difference}>
					<ArrowDownwardIcon className={classes.differenceIcon} />
					<Typography className={classes.differenceValue} variant='body2'>
						12%
					</Typography>
					<Typography className={classes.caption} variant='caption'>
						Since last month
					</Typography>
				</div>
			</CardContent>
		</Card>
	);
};

Weather.propTypes = {
	className: PropTypes.string
};

export default Weather;
