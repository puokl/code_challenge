def alphabetical_order(s):
    return ''.join(sorted(filter(str.isalpha, s.lower())))