using System;
using System.Collections.Generic;

namespace MilkRepository.Models;

public partial class Storage
{
    public int StorageId { get; set; }

    public string StorageName { get; set; } = null!;

    public virtual ICollection<DeliveryMan> DeliveryMen { get; set; } = new List<DeliveryMan>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
