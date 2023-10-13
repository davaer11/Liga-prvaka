import Match from './Match';

const MatchesInGroup = ({ onSetRoundResults, groupId, groupMatches }) => {
	return (
		<li>
			{groupMatches.map((match, matchIndex) => (
				<Match
					key={groupId * groupMatches.length + matchIndex}
					matchId={groupId * groupMatches.length + matchIndex}
					match={match}
					onSetRoundResults={onSetRoundResults}
				>
					{match}
				</Match>
			))}
		</li>
	);
};

export default MatchesInGroup;
