import pygame
import sys

# --- Constants ---
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
FPS = 60

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# --- Game Setup ---
pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Space Impact")
clock = pygame.time.Clock()

# --- Player Setup ---
# We'll use a pygame.Rect to represent our player for now.
# It stores the player's position (x, y) and size (width, height).
player_width = 50
player_height = 25
# Start the player on the left side, centered vertically
player_x = 50
player_y = (SCREEN_HEIGHT - player_height) / 2
player = pygame.Rect(player_x, player_y, player_width, player_height)

# --- Game Loop ---
running = True
while running:
    # --- Event Handling ---
    # Check for events (like closing the window)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # --- Drawing ---
    # 1. Fill the background with black. This clears the screen on each frame.
    screen.fill(BLACK)

    # 2. Draw the player on the screen as a white rectangle.
    pygame.draw.rect(screen, WHITE, player)

    # --- Update Display ---
    # This updates the entire screen to show everything we've drawn.
    pygame.display.flip()

    # --- Control Framerate ---
    # This ensures our game runs at a consistent speed (60 frames per second).
    clock.tick(FPS)

# --- Quit Game ---
pygame.quit()
sys.exit()