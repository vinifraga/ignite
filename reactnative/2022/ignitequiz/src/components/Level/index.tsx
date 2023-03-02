import { Text, PressableProps, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { THEME } from "../../styles/theme";
import { styles } from "./styles";

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...rest
}: Props) {
  const scale = useSharedValue(1);
  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const COLOR = TYPE_COLORS[type];

  function onPressIn() {
    scale.value = 1.2;
  }

  function onPressOut() {
    scale.value = 1;
  }

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      <Animated.View
        style={[
          styles.container,
          {
            borderColor: COLOR,
            backgroundColor: isChecked ? COLOR : "transparent",
          },
          animatedContainerStyles,
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isChecked ? THEME.COLORS.GREY_100 : COLOR },
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
