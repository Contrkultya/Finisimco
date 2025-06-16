class InputTerm:
    def __init__(self, 
                 name: str, 
                 value: float | None = None, 
                 team_owner: int | None = None,
                 approved: bool = False):
        self.name = name
        self.value = value
        self.team_owner = team_owner
        self.approved = approved

    def set_value(self, new_value):
        self.value = new_value

    def toggle_approval(self):
        self.approved = not self.approved

    def reset_approval(self):
        self.approved = False
